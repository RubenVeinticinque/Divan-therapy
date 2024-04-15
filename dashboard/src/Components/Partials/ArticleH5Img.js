function ArticleH5Img({ articleClassName, h5ClassName, h5Text, content }) {
  return (
    <article className={articleClassName}>
      <h5 className={h5ClassName}>{h5Text}</h5>
      {content}
    </article>
  );
}
export default ArticleH5Img;
