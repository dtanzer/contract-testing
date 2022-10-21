import { Verifier } from '@pact-foundation/pact';
import path from 'path';
import { app } from '../src/app';

const server = app.listen(8000, () => {
	console.log(`Server started on port 8000`);
});


describe("Pact Verification", () => {
    it("validates the expectations of ProductService", () => {
        const opts = {
            providerBaseUrl: "http://localhost:8000",
            provider: "GameServer",
            providerVersion: "1.0.0",
            pactUrls: [
                path.resolve(__dirname, '../../client-angular/pacts/angulargameclient-gameserver.json')
            ]
        };

        return new Verifier(opts).verifyProvider().then(output => {
            console.log(output);
        }).finally(() => {
			server.close();
		});
    });
});
