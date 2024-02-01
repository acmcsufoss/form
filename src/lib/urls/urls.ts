export function makeFormsURL() {
	return '/forms';
}

export function makeFormNewURL() {
	return `${makeFormsURL()}/new`;
}

export function makeFormURL(formID: string) {
	return `${makeFormsURL()}/${formID}`;
}

export function makeSubmissionsURL(formID: string) {
	return `${makeFormURL(formID)}/submissions`;
}

export function makeSubmissionNewURL(formID: string) {
	return `${makeSubmissionsURL(formID)}/new`;
}

export function makeSubmissionURL(formID: string, submissionID: string) {
	return `${makeSubmissionsURL(formID)}/${submissionID}`;
}
