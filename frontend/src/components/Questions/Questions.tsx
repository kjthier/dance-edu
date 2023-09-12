import React, { useState, useEffect } from 'react'
import { Box, Text } from '@radix-ui/themes'
import QuestionForm from './QuestionForm'
import { IQuestionAnswer } from '../../types/IQuestionAnswer'
import './questions.css'

type QuestionsProps = {
    userId: string
  }

const Questions: React.FC<QuestionsProps> = () => {
    const [questions, setQuestions] = useState<IQuestionAnswer[]>([])
    const [studentName, setStudentName] = useState<string | null>(null)
    const [studentId, setStudentId] = useState<string | null>(null)

    // Fetch student data from the server when the component mounts
    useEffect(() => {
        // Simulate a server fetch
        // replace this with an API call
        const fetchStudentData = async () => {
        // Replace with an actual server call like: const data = await api.get('/student')
        const data = { name: 'Karin Test', id: '123' } // Simulated data
        setStudentName(data.name)
        setStudentId(data.id)
    }

        fetchStudentData()
    }, [])

    const handleNewQuestion = (question: string, studentName: string, studentId: string) => {
        const newQuestion: IQuestionAnswer = {
            id: new Date().toISOString(),
            question,
            studentName,
            studentId,
            timestamp: new Date().toLocaleString()
        }
        setQuestions([...questions, newQuestion])
    }

    // only to test answers for styling purposes
    const handleTestAnswer = (id: string) => {
        setQuestions(prevQuestions => prevQuestions.map(q => {
          if (q.id === id) {
            return {
                ...q, 
                answer: 'This is a test answer.',
                answerTimestamp: new Date().toLocaleString()  // Add this line
            };
          }
          return q
        }))
      }

    return (
        <Box className="messages-container">
            <Box className="questions-form">
            {/* Only render the form if studentName and studentId are available */}
                {studentName && studentId && (
                    <QuestionForm 
                        onNewQuestion={handleNewQuestion} 
                        studentName={studentName} 
                        studentId={studentId} 
                    />
                )}
            </Box>
            <Box className="messages-list-container">
                <Box className="messages-list-heading">
                    Messages
                </Box>
                    {questions.map((q) => (
                        <Box key={q.id} className="question-answer-box">
                            <Text as="p" className="question-text">{q.question}</Text>
                            <Text as="p" className="timestamp-text">{q.timestamp}</Text> 
                            {q.answer && <Text as="p" className="answer-text">{q.answer}</Text>}
                            {q.answerTimestamp && <Text as="p" className="timestamp-text">{q.answerTimestamp}</Text>}
                            {/* button only to test answers for styling purposes */}
                            <button onClick={() => handleTestAnswer(q.id)}>Add Test Answer</button> 
                        </Box>
                    ))}
                </Box>
            </Box>
    )
}

export default Questions

