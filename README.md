# HashAuth

HashAuth is a single sign-on and know-your-customer provider for Hedera. By implementing the latest and most secure OpenID Connect and OAuth2 specifications, HashAuth allows users to effortlessly authenticate and share information with their favorite dApps. HashAuth also aims to solve the complex issue of know-your-customer requirements for DeFi applications by offering a KYCaaS model; end users can verify their identity a single time with HashAuth and granularly grant dApps access to this information as required via industry standard OAuth2 flows.

## Set Up

This monorepo utilizes pnpm, turbo and docker to faciliate super easy building and running. Assuming you have docker installed, simply:

Modify the paths in compose-dev.yaml to reflect your local HashAuth clone location. This is due to path limitations with docker secrets. I.e. change `/Users/mcfeelio/hashauth/secrets/dev/db_password` to `/path/to/your/hashauth/secrets/dev/db_password`

`git clone https://github.com/owenmcneil/HashAuth hashauth && cd hashauth`

`pnpm install`

`pnpm run dev`

You can then access the demo UI via `http://localhost`!
