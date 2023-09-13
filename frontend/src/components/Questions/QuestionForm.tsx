import React, { useState } from 'react'

import * as Form from '@radix-ui/react-form'

interface QuestionFormProps {
  onNewQuestion: (question: string, studentName: string, studentId: string) => void
  studentName: string
  studentId: string
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onNewQuestion, studentName, studentId }) => {
  const [question, setQuestion] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNewQuestion(question, studentName, studentId);
    setQuestion('') // clear the textarea after submission
  };

  return (
      <Form.Root className="question-form-root" onSubmit={handleSubmit}>
      <Form.Field name="question">

        <div className="form-field-wrapper">
          <Form.Label className="form-label">Ask a Question</Form.Label>
        </div>

        <Form.Control asChild>
          <textarea 
            className="textarea" 
            required 
            value={question} 
            onChange={e => setQuestion(e.target.value)} 
            placeholder="Type your question here..."
          />
        </Form.Control>

        {/* <Form.Message className="form-message" match="valueMissing">
            Please enter a question
        </Form.Message> */}

      </Form.Field>

      <Form.Submit asChild>
        <button className="primary-btn" type="submit">Submit</button>
      </Form.Submit>

    </Form.Root>
  )
}

export default QuestionForm




