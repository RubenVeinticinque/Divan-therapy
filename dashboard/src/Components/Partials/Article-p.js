function ArticleP({
  articleClassName,
  articleId,
  pClassName,
  pId,
  pText,
  p2ClassName,
  p2Id,
  p2Text,
}) {
  return (
    <article className={articleClassName} id={articleId}>
      <p className={pClassName} id={pId}>
        {pText}
      </p>
      <p className={p2ClassName} id={p2Id}>
        {p2Text}
      </p>
    </article>
  );
}
export default ArticleP;
