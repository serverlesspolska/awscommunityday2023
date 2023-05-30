from aws_cdk import Stack, aws_iam
from aws_cdk import aws_stepfunctions as sf
from aws_cdk.aws_iam import Effect
from constructs import Construct

from stepfunction.constants import DEFINITION_FILE, STEP_FUNCTION_SERVICE_ROLE, SERVICE_NAME
from stepfunction.get_file import get_file


class ExecutorConstruct(Construct):
    # pylint: disable=too-many-instance-attributes, line-too-long

    def __init__(self, scope: Construct, id_: str) -> None:
        super().__init__(scope, id_)

        self._scope = scope
        self.id_ = id_

        self.stack = Stack.of(self)
        self.region = self.stack.region
        self.account_id = self.stack.account
        self.stack_name = self.stack.stack_name

        self.sf_role = self._build_step_function_role()
        self.step_function = self._build_step_function()

    def _build_step_function_role(self) -> aws_iam.Role:
        policy_document = aws_iam.PolicyDocument()

        cw_policy_statement = aws_iam.PolicyStatement(actions=[
            'logs:CreateLogDelivery',
            'logs:CreateLogStream',
            'logs:PutLogEvents',
        ], effect=Effect.ALLOW, resources=['*'])

        xray_policy_statement = aws_iam.PolicyStatement(
            actions=['xray:PutTraceSegments', 'xray:PutTelemetryRecords', 'xray:GetSamplingRules',
                     'xray:GetSamplingTargets'],
            effect=Effect.ALLOW, resources=['*'])

        ecs_policy_statement = aws_iam.PolicyStatement(
            actions=[
                'ecs:UpdateService', 'elasticloadbalancing:DescribeTargetHealth',
                'elasticloadbalancing:DeregisterTargets', 'ecs:StopTask',
                'ecs:DescribeServices'
            ],
            effect=Effect.ALLOW,
            resources=['*']
        )

        policy_document.add_statements(cw_policy_statement)
        policy_document.add_statements(xray_policy_statement)
        policy_document.add_statements(ecs_policy_statement)

        policy = aws_iam.Policy(self, 'ScalerExecutorPolicy', document=policy_document)

        role = aws_iam.Role(self, STEP_FUNCTION_SERVICE_ROLE, description='Scaler Executor Service Role',
                            assumed_by=aws_iam.ServicePrincipal('states.amazonaws.com'))
        role.attach_inline_policy(policy=policy)
        aws_iam.PolicyDocument(
            statements=[aws_iam.PolicyStatement(effect=aws_iam.Effect.ALLOW, actions=['sts:AssumeRole'],
                                                resources=[role.role_arn])])

        return role

    def _build_step_function(self) -> sf.CfnStateMachine:
        return sf.CfnStateMachine(
            self,
            f'{SERVICE_NAME}-StepFunction',
            definition_string=get_file(DEFINITION_FILE),
            role_arn=self.sf_role.role_arn,
        )
