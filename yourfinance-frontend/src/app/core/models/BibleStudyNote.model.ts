export interface BibleStudyNote {
	book: string;
	chapter: number;
	verseStart?: number;
	verseEnd?: number;
	studyCategoy: BibleStudyCategory[];
	title: string;
	notes: string;
	studyDate: string;
}

export type BibleStudyCategory = 
"Hope" | 
"God's Character" | 
"Fear" | 
"Money" | 
"Sin" | 
"Manhood" | 
"Calling" | 
"Leadership" | 
"Fatherhood";