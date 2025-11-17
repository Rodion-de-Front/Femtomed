import ProductCard from '../ProductCard';
import femtoImage from '@assets/generated_images/FEMTO_LDV_laser_system_ef76a057.png';

export default function ProductCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <ProductCard
        title="FEMTO LDV Z8"
        description="Новейшая платформа фемтосекундного лазера с низкой энергией для рефракционной хирургии"
        image={femtoImage}
        features={[
          'Технология низкой энергии',
          'Интраоперационный ОКТ',
          'Точность на уровне микрон'
        ]}
      />
    </div>
  );
}
