export interface IQuestionAnswer {
    _id?: string
    question: string;
    studentName: string;
    studentId: string;
    timestamp: string;
    answer?: string;
    answerTimestamp?: string;
}