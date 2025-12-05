import { useEffect, useRef, useState } from "react";
import { useRoute } from "wouter";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar, MapPin, ArrowLeft, Play, Clock, X } from "lucide-react";
import conferenceImage from "@assets/generated_images/Medical_conference_event_8d1ad6c9.png";
import femtoImage from "@assets/generated_images/FEMTO_LDV_laser_system_ef76a057.png";
import galileiImage from "@assets/generated_images/GALILEI_diagnostic_device_2aba34c6.png";
import eyeVizImage from "@assets/generated_images/Eye_diagnostic_visualization_f0bad5c6.png";

// Данные блога (в реальном приложении это будет из API)
const blogData: Record<
  string,
  {
    title: string;
    date: string;
    location?: string;
    image?: string;
    video?: string;
    category?: string;
    content: string[];
    author?: string;
    readingTime?: number;
    gallery?: string[];
  }
> = {
  "clear-cornea-club-2024": {
    title: "Три портрета миопии в Красноярске",
    date: "20 июня 2024",
    location: "Москва",
    image: "/images/clearCorneaBanner.png",
    category: "Статьи",
    author: "Администрация",
    readingTime: 5,
    gallery: [conferenceImage, femtoImage, galileiImage],
    content: [
      "Конференция в рамках познавательного проекта для офтальмологов и неврологов прошла с большим успехом. Мероприятие собрало ведущих специалистов в области диагностики и лечения миопии.",
      "В рамках конференции были представлены три основных подхода к пониманию и лечению миопии: клинический, диагностический и терапевтический. Каждый подход раскрывает уникальные аспекты этого распространенного заболевания.",
      "Клинический портрет миопии включает в себя детальный анализ симптоматики, факторов риска и особенностей течения заболевания у различных возрастных групп. Специалисты подчеркнули важность ранней диагностики и профилактики.",
      "Диагностический портрет охватывает современные методы исследования, включая оптическую когерентную томографию, топографию роговицы и другие передовые технологии, позволяющие точно оценить состояние глаза.",
      "Терапевтический портрет представляет комплексный подход к лечению, включая консервативные методы, хирургические вмешательства и инновационные технологии, такие как фемтосекундные лазеры.",
    ],
  },
  "tri-portreta-miopii-kaliningrad": {
    title: "Три портрета миопии в Калининграде",
    date: "20 июня 2025",
    location: "Калининград",
    image: conferenceImage,
    category: "Обзоры",
    author: "Администрация",
    readingTime: 4,
    gallery: [conferenceImage, eyeVizImage, galileiImage],
    content: [
      "Познавательный проект о современных подходах к диагностике и лечению миопии продолжает свое путешествие по городам России. В Калининграде мероприятие вызвало особый интерес среди местных специалистов.",
      "Особое внимание было уделено инновационным методам лечения, включая технологию CLEAR SUPRA и использование фемтосекундных лазеров нового поколения.",
    ],
  },
  "erosh-evskie-chteniya-2025": {
    title: "Ерошевские чтения 2025",
    date: "19-21 июня 2025",
    location: "Самара",
    image: conferenceImage,
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Пример видео
    category: "Видео",
    author: "Администрация",
    readingTime: 8,
    gallery: [conferenceImage, femtoImage, galileiImage, eyeVizImage],
    content: [
      "Международная офтальмологическая конференция с участием ведущих специалистов из России и зарубежных стран прошла в Самаре. Мероприятие было посвящено памяти выдающегося офтальмолога Тихона Ивановича Ерошевского.",
      "В течение трех дней участники обсуждали актуальные вопросы современной офтальмологии, делились опытом и знакомились с новейшими технологиями в области диагностики и лечения заболеваний глаз.",
      "Особый интерес вызвали доклады о применении искусственного интеллекта в диагностике, новых методах лечения глаукомы и катаракты, а также инновационных хирургических техниках.",
      "Конференция включала практические мастер-классы, где специалисты могли на практике ознакомиться с работой современного оборудования, включая системы GALILEI G6 и FEMTO LDV Z8.",
    ],
  },
  "konferentsiya-vostok-zapad": {
    title: "Конференция Восток-Запад",
    date: "29-30 мая 2025",
    location: "Москва",
    image: conferenceImage,
    category: "Статьи",
    author: "Администрация",
    readingTime: 6,
    gallery: [conferenceImage, femtoImage, galileiImage],
    content: [
      "Международная конференция по офтальмологии в гибридном формате объединила специалистов из разных стран мира. Мероприятие проходило как очно, так и в онлайн-формате, что позволило значительно расширить аудиторию.",
      "Основными темами конференции стали: современные подходы к лечению рефракционных нарушений, инновации в диагностике заболеваний сетчатки, новые технологии в хирургии катаракты.",
    ],
  },
  "yuzhnorossiyskiy-oftalmologicheskiy-kongress": {
    title: "Южнороссийский офтальмологический конгресс",
    date: "30 января 2026",
    location: "Краснодар",
    image: "/images/mntk.png",
    category: "Новости",
    author: "Администрация",
    readingTime: 2,
    gallery: [conferenceImage, femtoImage, galileiImage],
    content: [
      "Уважаемые коллеги!",
      "30 января 2026 года в Краснодаре наша компания примет участие в Южнороссийском офтальмологическом конгрессе.",
      "Формат конгресса: гибридный.",
      "Место проведения: Отель «Crowne Plaza Krasnodar – Centre», Красная ул., 109, Краснодар.",
      "Тематики мероприятия:",
      "• Организация офтальмологической помощи: взаимодействие первичного звена и специализированных лечебных учреждений",
      "• Медико-социальные проблемы, заболеваемость, инвалидность, слепота, слабовидение, реабилитация",
      "• Актуальные проблемы фундаментальной офтальмологии",
      "• Патология органа зрения при системных заболеваниях",
      "• Современные методы хирургии глаукомы и фармакотерапия",
      "• Коррекция рефракционных нарушений",
      "• Витреоретинальная патология",
      "• Катаракта: травматическая, врожденная, осложненная",
      "• Детская офтальмология",
      "• Современные методы диагностики в офтальмологии",
      "Приглашаем вас на стенд компании ФЕМТОМЕД.",
      "Будьте здоровы и присоединяйтесь!",
    ],
  },
  "stukalovskie-chteniya-2025": {
    title:
      "Межрегиональная научно-практическая конференция «Стукаловские чтения 2025. Современная офтальмология – единство науки и практики»",
    date: "15-16 декабря 2025",
    location: "Воронеж",
    image: "/images/voroneg.jpg",
    category: "Новости",
    author: "Администрация",
    readingTime: 2,
    gallery: [conferenceImage, eyeVizImage, galileiImage],
    content: [
      "Уважаемые коллеги!",
      "15-16 декабря в Воронеже состоится Межрегиональная научно-практическая конференция «Стукаловские чтения 2025. Современная офтальмология - единство науки и практики».",
      "Приглашаем вас на стенд ФЕМТОМЕД в рамках выставки офтальмологического оборудования.",
      "Место проведения конференции: г. Воронеж, Пятницкого 65 А, отель «Дегас»",
      "15 декабря: конференц – зал «Академический»",
      "16 декабря: конференц – зал «Аудиенц»",
      "В программе конференции будут представлены такие доклады, как:",
      "16 декабря:",
      "11.30 -12.00 – «Инновационные технологии в роговичной и рефракционной хирургии»",
      "Докладчик: Слонимский Алексей Юрьевич, доктор медицинских наук, профессор, врач-офтальмолог высшей квалификационной категории, Московская Глазная Клиника",
      "12.30 -13.00 – «Технологии KLEx: сравнительный анализ результатов»",
      "Докладчик: Каримова Аделя Насибуллаевна, кандидат медицинских наук, врач-офтальмохирург высшей категории, МНТК «Микрохирургия глаза» им. акад. С.Н. Фёдорова (г. Москва)",
      "Будьте здоровы и присоединяйтесь!",
    ],
  },
  "tri-portreta-miopii-krasnyy-yar-2025": {
    title: "«Три портрета миопии: Красный Яр 2025»",
    date: "27 июня 2025",
    location: "Красноярск",
    image: conferenceImage,
    category: "Новости",
    author: "Администрация",
    readingTime: 2,
    gallery: [conferenceImage, femtoImage, galileiImage, eyeVizImage],
    content: [
      "Уважаемые коллеги!",
      "27 июня 2025 года в 15.30 состоится конференция в рамках познавательного проекта «Три портрета миопии» в Красноярске.",
      "В конференции примет участие Максимов Анатолий Сергеевич — главный внештатный взрослый офтальмолог Красноярского края, глав. врач КГБУЗ Красноярская краевая офтальмологическая клиническая больница имени профессора П.Г. Макарова, г. Красноярск.",
      "Цель конференции: знакомство специалистов офтальмологов и неврологов региона с новейшими аспектами патогенеза и стабилизации миопии, коррекции ее возможных осложнений, маршрутизации пациентов с миопией, для повышения уровня оказания специализированной медицинской помощи населению.",
      "Место проведения: г. Красноярск, ул. Молокова 37 Hilton Garden Inn Krasnoyarsk",
      "16.40 – 17.00 Скачков Дмитрий Павлович, офтальмохирург, к.м.н., главный врач клиники «Мицар» представит доклад «Опыт применения рефракционной экстракции лентикулы (CLEAR SUPRA) на FEMTO LDV Z 8 по данным клиники «Мицар»",
      "Будьте здоровы и присоединяйтесь!",
    ],
  },
  "tri-portreta-miopii-kaliningrad-2025": {
    title: "«Три портрета миопии: Калининград 2025»",
    date: "20 июня 2025",
    location: "Калининград",
    image: conferenceImage,
    category: "Новости",
    author: "Администрация",
    readingTime: 2,
    gallery: [conferenceImage, eyeVizImage, galileiImage],
    content: [
      "Уважаемые коллеги!",
      "20 июня 2025 года в 13.00 состоится конференция в рамках познавательного проекта «Три портрета миопии».",
      "В конференции примет участие Иванова Инесса Ивановна — заведующая отделением микрохирургии глаза ГБУЗ «Областная клиническая больница Калининградской области», главный внештатный офтальмолог Калининградской области, Заслуженный врач РФ, г. Калининград",
      "Цель конференции: знакомство специалистов офтальмологов региона с новейшими аспектами патогенеза и стабилизации миопии, коррекции ее возможных осложнений, маршрутизации пациентов с миопией, для повышения уровня оказания специализированной медицинской помощи населению.",
      "Место проведения: г. Калининград, ул. Клиническая, 74, актовый зал",
      "14.10 – 14.30 врач-офтальмолог ФГАУ НМИЦ «МНТК «Микрохирургия глаза» им. акад. С.Н. Федорова» М З России (г. Москва) представит доклад «Основные аспекты рефракционной экстракции лентикулы методом CLEAR SUPRA».",
      "Будьте здоровы и присоединяйтесь!",
    ],
  },
  "eroshovskie-chteniya-2025": {
    title: "Международная конференция «Ерошевские чтения»",
    date: "19-21 июня 2025",
    location: "Самара",
    image: "/images/Eroshevskie.png",
    category: "Новости",
    author: "Администрация",
    readingTime: 3,
    gallery: [conferenceImage, femtoImage, galileiImage, eyeVizImage],
    content: [
      "Уважаемые коллеги!",
      "19-21 июня 2025 года состоится международная офтальмологическая конференция «Ерошевские чтения».",
      "Место проведения: отель «Holiday Hall Samara», ул. Алексея Толстого, 99, г. Самара.",
      "19 июня:",
      "В рамках «Живой хирургии» будет представлена операция CRYSTAL CLEAR. Хирург: Кузнецова Татьяна Сергеевна, врач-офтальмолог высшей категории, к.м.н., Клиника микрохирургии глаза ОКДЦ ПАО «Газпром», г. Москва. Операция будет выполнена на фемтосекундном лазере FEMTO LDV Z8 швейцарской компании ZIEMER.",
      "20 июня:",
      "09.00 - 09.20 — Торжественное открытие в Большом банкетном зале",
      "17.25 - 17.40 — Казакбаев Ренат Амирович, главный врач «Клиники лазерной хирургии» (г. Уфа), врач-офтальмохирург высшей квалификационной категории. Доклад «Современные подходы к хирургии птеригиума». Место: Большой банкетный зал.",
      "21 июня:",
      "12.25 - 12.35 — Бреев Владимир Алексеевич, заведующий отделением коррекции рефракционных аномалий МНТК Волгоград, врач-офтальмолог высшей категории, к.м.н. Доклад «Наш опыт лентикулярной рефракционной хирургии».",
      "12.35 - 12.45 — Кузнецова Татьяна Сергеевна, врач-офтальмолог высшей категории, к.м.н., Клиника микрохирургии глаза ОКДЦ ПАО «Газпром», г. Москва. Доклад «Фемтолазерная лентикулярная коррекция миопии и миопического астигматизма по технологии FastCLEAR в сравнении с CLEAR SUPRA». Место: Большой банкетный зал.",
      "Приглашаем вас посетить выставку в рамках конференции! До скорой встречи!",
    ],
  },
  "vostok-zapad-2025": {
    title: "Международная конференция по офтальмологии «Восток-Запад»",
    date: "29-30 мая 2025",
    location: "Уфа",
    image: conferenceImage,
    category: "Новости",
    author: "Администрация",
    readingTime: 2,
    gallery: [conferenceImage, femtoImage, galileiImage],
    content: [
      "Уважаемые коллеги!",
      "29-30 мая 2025 года состоится Международная конференция по офтальмологии «ВОСТОК-ЗАПАД» в гибридном формате.",
      "Место проведения: РБ, г. Уфа, ул. Заки Валиди, д. 2 в Конгресс-Холле «Торатау».",
      "29 мая:",
      "С 16.00 до 18.00 состоится секция «СОВРЕМЕННЫЕ АСПЕКТЫ ДИАГНОСТИКИ И ЛЕЧЕНИЯ ЗАБОЛЕВАНИЙ РОГОВИЦЫ».",
      "Свой доклад «Лентикулярная хирургия CLEAR SUPRA: анализ результатов лечения» представит Заведующий отделением клиники «Кузляр» (Казань) Саушев Семен Андреевич. Примерное время доклада: 16.55-17.05",
      "30 мая:",
      "С 08.30 состоится секция «Живая хирургия».",
      "9.05 – 9.20 - Живая хирургия «Коррекция зрения по технологии CLEAR SUPRA через сверхмалый разрез» (Фемтосекундный лазер Femto LDV Z8 (Ziemer). Хирург: С.А. Саушев (Казань)",
      "Мы будем рады видеть вас на выставке оборудования и лекарственных средств!",
      "Будьте здоровы и присоединяйтесь!",
    ],
  },
  "orenburgskaya-konferentsiya-oftalmologov-2025": {
    title: "«Оренбургская Конференция Офтальмологов»",
    date: "23 мая 2025",
    location: "Оренбург",
    image: conferenceImage,
    category: "Новости",
    author: "Администрация",
    readingTime: 1,
    gallery: [conferenceImage, eyeVizImage, galileiImage],
    content: [
      "Уважаемые коллеги!",
      "23 мая 2025 года состоится Юбилейная конференция «Оренбургская Конференция Офтальмологов», посвященная 35-летию Оренбургского филиала МНТК.",
      "Место проведения конференции: ДКиС «Газовик», г. Оренбург, ул. Чкалова, д. 1",
      "10.45-11.00 Каримова Аделя Насибуллаевна, к.м.н., научный сотрудник отдела лазерной рефракционной хирургии ФГАУ «НМИЦ «МНТК «Микрохирургия глаза» им. акад. С.Н. Федорова» Минздрава России, г. Москва, представит доклад на тему: «Технология рефракционной экстракции лентикулы CLEAR SUPRA в коррекции миопии высокой степени».",
      "Будьте здоровы и присоединяйтесь!",
    ],
  },
  "sovremennye-podhody-k-diagnostike-i-lecheniyu-2025": {
    title:
      "«Современные подходы к диагностике и лечению социально значимых заболеваний глаз»",
    date: "16 мая 2025",
    location: "Калининград",
    image: conferenceImage,
    category: "Новости",
    author: "Администрация",
    readingTime: 3,
    gallery: [conferenceImage, femtoImage, galileiImage, eyeVizImage],
    content: [
      "Уважаемые коллеги!",
      "16 мая 2025 года состоится научно-практическая конференция «Современные подходы к диагностике и лечению социально значимых заболеваний глаз», в рамках Межрегиональной образовательной программы Общероссийской общественной организации «Ассоциация врачей офтальмологов» в офлайн формате.",
      "Место проведения: Отель «Holiday Inn Kaliningrad», конференц-зал «Гофман», г. Калининград, ул. Виктора Гюго д. 1",
      "Основной задачей Межрегиональной образовательной программы «Современные подходы к диагностике и лечению социально значимых заболеваний глаз» является повышение профессиональных знаний врачей-офтальмологов по вопросам современных подходов к лечению и мониторингу глаукомы, катаракты и наиболее распространенных заболеваний сетчатки, включая лечение диабетической ретинопатии и диабетического макулярного отека.",
      "В рамках мероприятия пройдет выставка лекарственных препаратов от ведущих отечественных и зарубежных фирм-производителей.",
      "18.05-18.25 К.м.н., Заведующий операционным блоком №1, врач-офтальмолог Овечкин Николай Игоревич представит доклад «Применение фемтосекундного лазера в хирургии катаракты».",
      "Будьте здоровы и присоединяйтесь!",
    ],
  },
  "tri-portreta-miopii-primorie-2025": {
    title: "«Три портрета миопии: миопия в Приморье 2025»",
    date: "16 мая 2025",
    location: "Владивосток",
    image: conferenceImage,
    category: "Новости",
    author: "Администрация",
    readingTime: 2,
    gallery: [conferenceImage, eyeVizImage, galileiImage],
    content: [
      "Уважаемые коллеги!",
      "16 мая 2025 года состоится конференция офтальмологов и неврологов: «Три портрета миопии: миопия в Приморье 2025».",
      "Организаторы:",
      "• ФГБОУ ВО «Тихоокеанский государственный медицинский университет» Министерства здравоохранения Российской Федерации",
      "• Министерство здравоохранения Приморского края",
      "• Электронное СМИ Офтальмологический портал Орган зрения",
      "Цель конференции: знакомство специалистов офтальмологов и неврологов региона с новейшими аспектами патогенеза и стабилизации миопии, коррекции ее возможных осложнений, маршрутизации пациентов с миопией, для повышения уровня оказания специализированной медицинской помощи населению Приморского края.",
      "Место проведения: г. Владивосток, Океанский проспект, 165, Тихоокеанский государственный медицинский университет, корпус 2, 13 этаж, зал Артемида",
      "16.50 – 17.10 Скачков Дмитрий Павлович, офтальмохирург, к.м.н., главный врач клиники «Мицар» представит доклад «Опыт применения рефракционной экстракции лентикулы (CLEAR SUPRA) на FEMTO LDV Z 8 по данным клиники «Мицар»",
      "Будьте здоровы и присоединяйтесь!",
    ],
  },
  "oftalmogerontologiya-2025": {
    title:
      "V Международный Научно-образовательный форум «Офтальмогеронтология — инновационные решения проблем»",
    date: "15-16 мая 2025",
    location: "Москва",
    image: conferenceImage,
    category: "Новости",
    author: "Администрация",
    readingTime: 2,
    gallery: [conferenceImage, femtoImage, galileiImage, eyeVizImage],
    content: [
      "Уважаемые коллеги!",
      "15-16 мая состоится V Международный Научно-образовательный форум «Офтальмогеронтология — инновационные решения проблем».",
      "Адрес проведения: Москва, Раменский бульвар, д. 1",
      "Участие бесплатное.",
      "Трансфер:",
      "Для вашего удобства бесплатные автобусы будут курсировать 15 мая по маршруту м. Раменки — Кластер «Ломоносов»:",
      "• в 8.00",
      "• в 8.15",
      "• в 8.30",
      "• в 9.00",
      "Также бесплатные автобусы будут курсировать 16 мая по маршруту м. Раменки — Кластер «Ломоносов»:",
      "• в 7.30",
      "• в 7.45",
      "• в 8.00",
      "• в 8.30",
      "Приглашаем вас посетить стенд нашей компании ФЕМТОМЕД в рамках форума!",
      "Будьте здоровы и присоединяйтесь!",
    ],
  },
  oftalmogerontologiya: {
    title: "Офтальмогеронтология",
    date: "15-16 мая 2025",
    location: "Москва",
    image: conferenceImage,
    category: "Обзоры",
    author: "Администрация",
    readingTime: 7,
    gallery: [conferenceImage, femtoImage, galileiImage, eyeVizImage],
    content: [
      "V Международный научно-образовательный форум - инновационные решения проблем офтальмогеронтологии прошел в Москве. Форум был посвящен особенностям диагностики и лечения глазных заболеваний у пациентов пожилого возраста.",
      "Участники обсудили современные подходы к лечению возрастной макулярной дегенерации, глаукомы, катаракты и других заболеваний, характерных для пожилых пациентов.",
    ],
  },
};

export default function BlogDetail() {
  const [match, params] = useRoute<{ id: string }>("/blog/:id");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  const blogId = match && params ? params.id : "";
  const blog = blogId ? blogData[blogId] : undefined;

  // Показываем 404 для записей, которые не категории "Новости" или не найдены
  if (!blog || blog.category !== "Новости") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Запись не найдена</h1>
            <Link href="/blog">
              <Button>Вернуться к блогу</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  useEffect(() => {
    // Анимация для hero секции
    if (heroRef.current) {
      heroRef.current.classList.add(
        "animate-in",
        "fade-in",
        "slide-in-from-bottom-4",
        "duration-700"
      );
    }

    // Анимация для контента при скролле
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "animate-in",
              "fade-in",
              "slide-in-from-bottom-4",
              "duration-700"
            );
          }
        });
      },
      { threshold: 0.1 }
    );

    contentRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [blogId]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero секция */}
        <div
          ref={heroRef}
          className="relative py-20 bg-gradient-to-b from-primary/5 to-background overflow-hidden"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link href="/blog">
              <Button
                variant="ghost"
                className="mb-8 hover-elevate transition-all"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад к блогу
              </Button>
            </Link>

            <div className="space-y-6">
              {blog.category && (
                <div className="inline-block animate-in fade-in slide-in-from-left duration-500">
                  <div className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-semibold">
                    {blog.category}
                  </div>
                </div>
              )}

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{blog.date}</span>
                </div>
                {blog.location && blog.location !== "-" && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{blog.location}</span>
                  </div>
                )}
                {blog.readingTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{blog.readingTime} мин чтения</span>
                  </div>
                )}
                {blog.author && (
                  <div className="text-sm">
                    Автор:{" "}
                    <span className="font-medium text-foreground">
                      {blog.author}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Медиа секция (изображение или видео) */}
        {(blog.image || blog.video) && (
          <div
            ref={(el) => (contentRefs.current[0] = el)}
            className="py-12 bg-background"
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <Card className="overflow-hidden border-0 shadow-xl">
                {blog.video ? (
                  <div className="relative w-full aspect-video bg-muted">
                    <iframe
                      src={blog.video}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={blog.title}
                    />
                  </div>
                ) : blog.image ? (
                  <div className="relative w-full aspect-video overflow-hidden bg-muted">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}
              </Card>
            </div>
          </div>
        )}

        {/* Контент */}
        <div className="py-12 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="prose prose-lg max-w-none">
              {blog.content.map((paragraph, index) => (
                <div
                  key={index}
                  ref={(el) => (contentRefs.current[index + 1] = el)}
                  className="mb-6 text-lg leading-relaxed text-foreground"
                >
                  <p>{paragraph}</p>
                </div>
              ))}
            </article>
          </div>
        </div>

        {/* Галерея изображений */}
        {/* {blog.gallery && blog.gallery.length > 0 && (
          <div
            ref={(el) => (contentRefs.current[contentRefs.current.length] = el)}
            className="py-12 bg-muted/30"
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-8 text-center">Галерея</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {blog.gallery.map((image, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden cursor-pointer hover-elevate transition-all group"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <img
                        src={image}
                        alt={`${blog.title} - изображение ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )} */}

        {/* Дополнительные материалы */}
        <div
          ref={(el) => (contentRefs.current[contentRefs.current.length] = el)}
          className="py-12 bg-muted/30"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Интересно узнать больше?</h2>
                <p className="text-muted-foreground">
                  Изучите наше оборудование и технологии для современной
                  офтальмологии
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link href="/products">
                    <Button size="lg" className="hover-elevate transition-all">
                      Наше оборудование
                    </Button>
                  </Link>
                  <Link href="/blog">
                    <Button
                      size="lg"
                      variant="outline"
                      className="hover-elevate transition-all"
                    >
                      Все записи
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />

      {/* Модальное окно для просмотра изображения */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-5xl p-0">
          {selectedImage && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-5 h-5" />
              </Button>
              <img
                src={selectedImage}
                alt="Просмотр изображения"
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
