export interface LessonCreation {
  id?: number,
  user: number,
  category: number,
  answers?: number[]
}

export interface Lesson {
  id: number,
  user: number,
  category: number,
  answers: number[]
}
