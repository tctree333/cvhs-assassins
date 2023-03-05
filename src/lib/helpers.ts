import { getDoc } from './sheets';

export async function validateUser(
	userId: string,
	password: string
): Promise<{ id: string } | false> {
	const doc = await getDoc();

	const rows = await doc.sheetsByTitle['Participant Information'].getRows();
	const user = rows.find((row) => row['ID'] === userId && row['Password'] === password);

	if (user == undefined) {
		return false;
	}

	return {
		id: user['ID']
	};
}

export async function getUserInfo(userId: string): Promise<
	| {
			name: string;
			team: string;
			eliminated: boolean;
			disqualified: boolean;
			advancing: boolean;
			targets: { name: string; eliminated: boolean; disqualified: boolean }[];
			targetTeam: string;
	  }
	| false
> {
	const doc = await getDoc();

	const participants = await doc.sheetsByTitle['Participant Information'].getRows();
	const user = participants.find((row) => row['ID'] === userId);
	if (user == undefined) {
		return false;
	}

	const targetList = await doc.sheetsByTitle['Targets'].getRows();
	const targetTeam = targetList.find((row) => row['Team Number'] === user['Team Number']);
	if (targetTeam == undefined) {
		return false;
	}
	const targets = participants
		.filter((row) => row['Team Number'] === targetTeam['Target Team Number'])
		.map((row) => ({
			name: row['Name'],
			eliminated: row['Eliminated'] === 'TRUE',
			disqualified: row['Disqualified'] === 'TRUE'
		}));

	return {
		name: user['Name'],
		team: user['Team Name'],
		eliminated: user['Eliminated'] === 'TRUE',
		disqualified: user['Disqualified'] === 'TRUE',
		advancing: user['Advancing'] === 'TRUE',
		targets,
		targetTeam: targetTeam['Target Team']
	};
}
