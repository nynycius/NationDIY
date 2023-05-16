import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Answer } from 'src/app/shared/answer.interface';
import { Question } from 'src/app/shared/question.interface';

@Injectable({
  providedIn: 'root'
})

// interacts with backend for generate services
export class QuestionsService {
  //uses http to send requests through API , in this service is used GET, POST, PATCH and DELETE requests to create methods that will be used to implement complexs logics in the application
  constructor(private httpClient: HttpClient) { }

  getQuestions(tag: string = "") {
    return this.httpClient.get<Question[]>('https://nation-diy.vercel.app/questions', {params: {tag}})
  }

  queryQuestions(pageNumber: number, pageSize: number, tag: string) {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)
      .set('tag', tag)

    return this.httpClient.get<any>("https://nation-diy.vercel.app/questions", { params })
  }

  postQuestion(title: string, tags: string | null, body: string){
    return this.httpClient.post<any>('https://nation-diy.vercel.app/questions', { title, tags: tags ? Array.from(tags) : null, body })
  }

  getQuestionById(questionId: string): Observable<Question | null> {
    return this.httpClient.get<any>(`https://nation-diy.vercel.app/questions/${questionId}`)
  }

  deleteQuestion(questionId: string){
    return this.httpClient.delete<{sucess: boolean}>(`https://nation-diy.vercel.app/questions/${questionId}`)
  }

  voteQuestion(questionId: string, value: number) {
    return this.httpClient.patch<any>(`https://nation-diy.vercel.app/questions/${questionId}/vote`, { value });
  }

  answerQuestion(questionId: string, answerBody: string) {
    return this.httpClient.post<any>(`https://nation-diy.vercel.app/questions/${questionId}/answers`, { body: answerBody });
  }

  getQuestionAnswers(questionId: string): Observable<Answer[]> {
    return this.httpClient.get<Answer[]>(`https://nation-diy.vercel.app/questions/${questionId}/answers`)
  }

  acceptAnswer(answerId: string, questionId: string){
    return this.httpClient.patch<any>(`https://nation-diy.vercel.app/questions/${questionId}/accept-answer`, { answerId });
  }

  voteAnswer(answerId: string, questionId: string, value: number) {
    return this.httpClient.patch<any>(`https://nation-diy.vercel.app/questions/${questionId}/answers/${answerId}/vote`, { value })
  }

  deleteAnswer(answerId: string, questionId: string){
    return this.httpClient.delete<{sucess: boolean}>(`https://nation-diy.vercel.app/questions/${questionId}/answers/${answerId}`)
  }

  getTags(){
    return this.httpClient.get<any>(`https://nation-diy.vercel.app/questions/tags`)
  }

  postComment(questionId: string, commentBody: string){
    return this.httpClient.post<any>(`https://nation-diy.vercel.app/questions/${questionId}/comments`, { body: commentBody });
  }

  postAnswerComment(answerId: string, questionId: string, commentBody: string){
    return this.httpClient.post<any>(`https://nation-diy.vercel.app/questions/${questionId}/answers/${answerId}/comments`, { body: commentBody });
  }
}
