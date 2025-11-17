import VisionTestCard from '../VisionTestCard';

export default function VisionTestCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <VisionTestCard
        title="Таблица Сивцева"
        description="Проверьте остроту зрения с помощью классической таблицы с буквами кириллицы"
        icon="eye"
        testId="sivtsev"
      />
    </div>
  );
}
