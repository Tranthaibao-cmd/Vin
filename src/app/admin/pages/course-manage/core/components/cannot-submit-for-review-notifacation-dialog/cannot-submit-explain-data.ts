import { WEB_BASE_URL } from "@admin/pages/course-manage/modules/curriculum/models/config";


export const cannotSubmitExplainData = (courseId: string) => {
  return {
    title: `Tiêu đề khóa học (ở phần <a href='${WEB_BASE_URL}/instructor/${courseId}/manage/course-landing-page'>Trang đích của khóa học</a>) chưa được điền`,
    knowleages_will_learn: `Mục kiến thức học được sau khóa học (ở phần <a href='${WEB_BASE_URL}/instructor/${courseId}/manage/intended-learners'>Mục đích môn học</a>) chưa được điền`,
    prerequisites: `Mục kiến thức cần có trước khi tham gia khóa học (ở phần <a href='${WEB_BASE_URL}/instructor/${courseId}/manage/intended-learners'>Mục đích môn học</a>) chưa được điền`,
    description: `Mô tả khóa học (ở phần <a href='${WEB_BASE_URL}/instructor/${courseId}/manage/course-landing-page'>Trang đích của khóa học</a>) chưa được điền`,
    who_course_is_for: `Mục khóa học dành cho ai (ở phần <a href='${WEB_BASE_URL}/instructor/${courseId}/manage/intended-learners'>Mục đích môn học</a>) chưa được điền`,
    order_contents: `Nội dung chưa có(ở phần <a href='${WEB_BASE_URL}/instructor/${courseId}/manage/curriculum'>Chương trình giảng dạy</a>)`,
    category: `Thể loại khóa học chưa có (ở phần <a href="${WEB_BASE_URL}/instructor/${courseId}/manage/course-landing-page">Trang đích của khóa học</a>)`,
    teaching_language: `Ngôn ngữ khóa học (ở phần <a href="${WEB_BASE_URL}/instructor/${courseId}/manage/course-landing-page">Trang đích của khóa học</a>) chưa có`,
    img: `Ảnh khóa học (ở phần <a href="${WEB_BASE_URL}/instructor/${courseId}/manage/course-landing-page"Trang đích của khóa học</a>) chưa có`,

    price: `Giá khóa học (ở phần <a href="${WEB_BASE_URL}/instructor/${courseId}/manage/pricing">Học phí</a>) chưa được điền`,
  };
};
