import MenuItem from './MenuItem';

/**
 * Componente para mostrar una sección completa del menú
 * Renderiza todos los items de una categoría específica en formato de lista
 */
const MenuSection = ({ 
  category, 
  showCheckboxes = false, 
  selectedItems = {}, 
  onItemSelection = null 
}) => {
  return (
    <section className="mb-12">
      {/* Título de la sección */}
      <div className="text-center mb-8">
        <h2 className="section-title">{category.name}</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {category.description}
        </p>
      </div>
      
      {/* Lista de productos */}
      <div className="card overflow-hidden">
        {category.items.map((item, index) => (
          <MenuItem
            key={item.id}
            item={item}
            showCheckbox={showCheckboxes}
            isSelected={selectedItems[item.id] || false}
            onSelectionChange={onItemSelection}
          />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
