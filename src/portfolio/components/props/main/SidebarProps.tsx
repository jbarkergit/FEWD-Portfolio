type SidebarPropsType = {
  description: string;
};

const SidebarProps = ({ description }: SidebarPropsType) => {
  return (
    <article className="sidebar__article">
      <span className="sidebar__article__digest">
        <h2>Information Digest</h2>
        <p>{description}</p>
      </span>
    </article>
  );
};

export default SidebarProps;
