import {expect as expectCDK, matchTemplate, MatchStyle} from "@aws-cdk/assert"
import * as cdk from "@aws-cdk/core"
import * as AwsCiCd from "../lib/aws_cicd_stack"

test("Empty Stack", () => {
  const app = new cdk.App()
  // WHEN
  const stack = new AwsCiCd.CICDStack(app, "MyTestStack")
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
