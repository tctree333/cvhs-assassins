import { GOOGLE_PRIVATE_KEY, GOOGLE_SERVICE_EMAIL, SHEETS_ID } from '$env/static/private';
import { GoogleSpreadsheet } from 'google-spreadsheet';

let doc: GoogleSpreadsheet;

export async function getDoc() {
	if (doc == undefined) {
		doc = new GoogleSpreadsheet(SHEETS_ID);
		await doc.useServiceAccountAuth({
			// env var values are copied from service account credentials generated by google
			// see "Authentication" section in docs for more info
			client_email: GOOGLE_SERVICE_EMAIL,
			private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
		});
	}
	await doc.loadInfo();
	return doc;
}
