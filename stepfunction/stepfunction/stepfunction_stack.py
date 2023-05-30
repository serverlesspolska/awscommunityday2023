from aws_cdk import (
    Stack,
)
from constructs import Construct
from stepfunction.constants import SERVICE_NAME
from stepfunction.stepfunction_construct import ExecutorConstruct


class StepfunctionStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        self.step_function = ExecutorConstruct(self, f'{SERVICE_NAME}-StepFunction')
