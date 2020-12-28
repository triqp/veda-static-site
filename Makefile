install:
	cd my-website && npm install && cd ../infrastructure && npm install

build-site:
	cd my-website && npm run build

test-stack:
	cd infrastructure && npm run test

generate-stack:
	cd infrastructure && cdk synth

deploy-stack:
	cd infrastructure && cdk deploy