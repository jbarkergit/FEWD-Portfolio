import { TablerCategoryFilled } from '~/film-database/assets/svg/icons';

const FDCollectionsCollectionHeader = ({ header }: { header: string }) => {
  return (
    <header>
      <TablerCategoryFilled />
      <h2 contentEditable='true' suppressContentEditableWarning={true}>
        {header.length > 0 ? header : 'Unnamed Collection'}
      </h2>
    </header>
  );
};

export default FDCollectionsCollectionHeader;
