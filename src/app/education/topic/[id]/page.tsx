'use client';

import { use } from 'react'; // 👈 Required
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftIcon,
  ChartBarIcon,
  SparklesIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import {EducationTopic, educationTopics} from '@/models/type';

export default function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params); // ✅ unwrap the Promise

  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [currentSection, setCurrentSection] = useState<'content' | 'quiz' | 'case-study'>('content');

  const topic = educationTopics.find((t: EducationTopic) => t.id === id);

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Topic not found</h1>
            <button
              onClick={() => router.back()}
              className="mt-4 px-4 py-2 bg-cyan-400 text-white rounded-lg hover:bg-cyan-500 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const checkQuizAnswers = () => {
    setShowQuizResults(true);
  };

  const correctAnswers = topic.quiz?.reduce((acc: number, q: NonNullable<EducationTopic['quiz']>[number], i: number) => {
    return acc + (quizAnswers[i] === q.correctAnswer ? 1 : 0);
  }, 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-cyan-400 dark:hover:text-blue-400 transition-colors mb-4"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Topics
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {topic.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-3 py-1 text-sm rounded-full font-medium ${
              topic.level === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              topic.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {topic.level}
            </span>
            <span className="px-3 py-1 text-sm rounded-full font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {topic.category}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setCurrentSection('content')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentSection === 'content'
                ? 'bg-cyan-400 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Content
          </button>
          {topic.quiz && (
            <button
              onClick={() => setCurrentSection('quiz')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentSection === 'quiz'
                  ? 'bg-cyan-400 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Quiz
            </button>
          )}
          {topic.caseStudy && (
            <button
              onClick={() => setCurrentSection('case-study')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentSection === 'case-study'
                  ? 'bg-cyan-400 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Case Study
            </button>
          )}
        </div>

        {/* Content Section */}
        {currentSection === 'content' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 prose dark:prose-invert max-w-none">
            {topic.content.split('\n\n').map((paragraph: string, index: number) => (
              <p key={index} className="text-gray-600 dark:text-gray-300 mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Quiz Section */}
        {currentSection === 'quiz' && topic.quiz && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <ChartBarIcon className="h-6 w-6 text-blue-500" />
              Knowledge Check
            </h2>
            {topic.quiz.map((question: NonNullable<EducationTopic['quiz']>[number], qIndex: number) => (
              <div key={qIndex} className="mb-8">
                <p className="font-medium mb-4">{question.question}</p>
                <div className="space-y-3">
                  {question.options.map((option: string, oIndex: number) => (
                    <label
                      key={oIndex}
                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                        showQuizResults
                          ? oIndex === question.correctAnswer
                            ? 'bg-green-100 dark:bg-green-900/50'
                            : quizAnswers[qIndex] === oIndex
                            ? 'bg-red-100 dark:bg-red-900/50'
                            : 'bg-gray-50 dark:bg-gray-700'
                          : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`quiz-${qIndex}`}
                        checked={quizAnswers[qIndex] === oIndex}
                        onChange={() => handleQuizAnswer(qIndex, oIndex)}
                        className="mr-3"
                        disabled={showQuizResults}
                      />
                      {option}
                      {showQuizResults && (
                        <span className="ml-auto">
                          {oIndex === question.correctAnswer ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                          ) : quizAnswers[qIndex] === oIndex ? (
                            <XCircleIcon className="h-5 w-5 text-red-500" />
                          ) : null}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
                {showQuizResults && (
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                    {question.explanation}
                  </p>
                )}
              </div>
            ))}
            {!showQuizResults && (
              <button
                onClick={checkQuizAnswers}
                className="w-full px-4 py-2 bg-cyan-400 text-white rounded-lg hover:bg-cyan-500 transition-colors"
              >
                Check Answers
              </button>
            )}
            {showQuizResults && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-center text-lg font-medium">
                  You got {correctAnswers} out of {topic.quiz.length} correct!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Case Study Section */}
        {currentSection === 'case-study' && topic.caseStudy && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <SparklesIcon className="h-6 w-6 text-purple-500" />
              Case Study
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="font-medium mb-2 text-cyan-400 dark:text-blue-400">Scenario</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {topic.caseStudy.scenario}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="font-medium mb-2 text-green-600 dark:text-green-400">Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {topic.caseStudy.analysis}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="font-medium mb-2 text-purple-600 dark:text-purple-400">Solution</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {topic.caseStudy.solution}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="font-medium mb-2 text-yellow-600 dark:text-yellow-400">Key Learnings</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  {topic.caseStudy.keyLearnings.map((learning: string, index: number) => (
                    <li key={index}>{learning}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 