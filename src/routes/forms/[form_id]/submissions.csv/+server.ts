import type { RequestHandler } from './$types';
import * as exportToCSV from 'export-to-csv';
import { s } from '$lib/resources/store';
import type { Submission } from '$lib/store';

export const GET: RequestHandler = async ({ params }) => {
	const submissions = await s.getSubmissionsByFormID(params.form_id);
	const csv = submissionsToCSV(submissions);
	return new Response(csv, {
		headers: {
			'Content-Type': 'text/csv'
		}
	});
};

// TODO: Submissions to JSON.
function submissionsToCSV(submissions: Submission[]): string {
	const config = exportToCSV.mkConfig({ useKeysAsHeaders: true });
	const data = exportToCSV.generateCsv(config)(
		submissions.map((submission) => ({
			...submission.data,
			id: submission.id,
			formID: submission.formID,
			userID: submission.userID,
			submittedAt: submission.submittedAt
		}))
	);
	return exportToCSV.asString(data);
}
