const { RESTDataSource } = require('apollo-datasource-rest');

class LessonAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.c0d3.com/api';
  }

  lessonReducer(lesson) {
   return {
    id: lesson.id,
    title: lesson.title,
    challenges: lesson.challenges
   }
  }

  async getAllLessons() {
    const response = await this.get('lessons');
    return Array.isArray(response)
          ? response.map(lesson => this.lessonReducer(lesson))
          : [];
  }}

module.exports = LessonAPI;
