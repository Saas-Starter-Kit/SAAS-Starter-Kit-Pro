import {expect as expectCDK, matchTemplate, MatchStyle} from "@aws-cdk/assert"
import * as cdk from "@aws-cdk/core"
import * as AwsFargateApiServerTest from "../lib/aws_fargate_api_server_test_stack"

test("Empty Stack", () => {
  const app = new cdk.App()
  // WHEN
  const stack = new AwsFargateApiServerTest.AwsFargateApiServerTestStack(app, "MyTestStack")
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT
    )
  )
})
