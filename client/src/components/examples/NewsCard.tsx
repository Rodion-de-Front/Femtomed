import NewsCard from '../NewsCard';
import conferenceImage from '@assets/generated_images/Medical_conference_event_8d1ad6c9.png';

export default function NewsCardExample() {
  return (
    <div className="p-8 max-w-md">
      <NewsCard
        title="Международная конференция по офтальмологии ВОСТОК-ЗАПАД"
        date="29-30 мая 2025"
        location="Москва"
        image={conferenceImage}
        excerpt="Состоится Международная конференция по офтальмологии в гибридном формате с участием ведущих специалистов из России и зарубежья"
        category="Конференция"
      />
    </div>
  );
}
