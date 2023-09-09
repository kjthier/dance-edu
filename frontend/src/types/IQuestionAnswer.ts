export interface IQuestionAnswer {
    id: string;
    question: string;
    studentName: string;
    studentId: string;
    timestamp: string;
    answer?: string;
    answerTimestamp?: string;
}