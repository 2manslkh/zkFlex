import { ContractConfig, defineConfig } from "@wagmi/cli";

import { actions } from "@wagmi/cli/plugins";

function overrideDeployments(): ContractConfig[] {

  return [
  ]
}


export default defineConfig({
  out: "src/generated.ts",
  contracts: [...overrideDeployments()],
  plugins: [
    actions(),
  ],
});
