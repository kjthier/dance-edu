import React, { useState } from 'react'
import * as Form from '@radix-ui/react-form'

interface QuestionFormProps {
    onNewQuestion: (question: string, userName: string, userId: string) => void
    userName: string
    userId: string
}

const QuestionForm: React.FC<QuestionFormProps> = ({
    onNewQuestion,
    userName,
    userId,
}) => {
    const [question, setQuestion] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onNewQuestion(question, userName, userId)
        setQuestion('') // clears the textarea after submission
    }

    return (
        <Form.Root className='question-form-root' onSubmit={handleSubmit}>
            <Form.Field name='question'>
                <div className='form-field-wrapper'>
                    <Form.Label className='form-label'>
                        Ask a Question
                    </Form.Label>
                </div>

                <Form.Control asChild>
                    <textarea
                        className='textarea'
                        required
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder='Type your question here...'
                    />
                </Form.Control>
            </Form.Field>

            <Form.Submit asChild>
                <button className='primary-btn send-btn' type='submit'>
                    Send
                </button>
            </Form.Submit>
        </Form.Root>
    )
}

export default QuestionForm
