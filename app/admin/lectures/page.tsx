"use client";

import Header from "@/components/admin/header";
import LectureForm from "@/components/admin/lecture-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const dummyLectures = [
  {
    id: 1,
    title: "피그마 MCP로 디자인 딸깍 가능?",
    description: "피그마 MCP로 디자인 딸깍 가능?",
    videoUrl: "https://www.youtube.com/watch?v=H-yo6dzJ13g",
    duration: "2시간 30분",
    createdAt: "2024-03-15",
  },
  {
    id: 2,
    title: "React 기초 강의",
    description: "React의 기본 개념과 사용법을 배웁니다.",
    videoUrl: "https://www.youtube.com/watch?v=LzsB2AJI90s",
    duration: "2시간 30분",
    createdAt: "2024-03-15",
  },
  {
    id: 3,
    title: "React 기초 강의",
    description: "React의 기본 개념과 사용법을 배웁니다.",
    videoUrl: "https://www.youtube.com/watch?v=Q4YV_bWrSkg",
    duration: "2시간 30분",
    createdAt: "2024-03-15",
  },
  {
    id: 4,
    title: "React 기초 강의",
    description: "React의 기본 개념과 사용법을 배웁니다.",
    videoUrl: "https://www.youtube.com/watch?v=H-yo6dzJ13g",
    duration: "2시간 30분",
    createdAt: "2024-03-15",
  },
  {
    id: 5,
    title: "React 기초 강의",
    description: "React의 기본 개념과 사용법을 배웁니다.",
    videoUrl: "https://www.youtube.com/watch?v=H-yo6dzJ13g",
    duration: "2시간 30분",
    createdAt: "2024-03-15",
  },
];

const getYouTubeEmbedUrl = (url: string) => {
  const videoId = url.split("v=")[1];
  return `https://www.youtube.com/embed/${videoId}`;
};

const getYouTubeThumbnailUrl = (url: string) => {
  const videoId = url.split("v=")[1];
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export default function LecturesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<
    (typeof dummyLectures)[0] | null
  >(null);

  return (
    <div className="space-y-4">
      <Header />
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">강의 관리</h1>
        <div className="flex justify-end">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#5046E4] hover:bg-[#4038c7]">
                강의 추가
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>강의 추가</DialogTitle>
              </DialogHeader>
              <LectureForm onSuccess={() => setIsOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 강의 목록 컴포넌트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyLectures.map((lecture) => (
          <div
            key={lecture.id}
            className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedLecture(lecture)}
          >
            <div className="aspect-video relative">
              <img
                src={getYouTubeThumbnailUrl(lecture.videoUrl)}
                alt={lecture.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{lecture.title}</h3>
              <p className="text-gray-600 mb-2 line-clamp-2">
                {lecture.description}
              </p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>소요시간: {lecture.duration}</span>
                <span>생성일: {lecture.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={!!selectedLecture}
        onOpenChange={() => setSelectedLecture(null)}
      >
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{selectedLecture?.title}</DialogTitle>
          </DialogHeader>
          {selectedLecture && (
            <div className="space-y-4">
              <div className="aspect-video">
                <iframe
                  src={getYouTubeEmbedUrl(selectedLecture.videoUrl)}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">{selectedLecture.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>소요시간: {selectedLecture.duration}</span>
                  <span>생성일: {selectedLecture.createdAt}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
