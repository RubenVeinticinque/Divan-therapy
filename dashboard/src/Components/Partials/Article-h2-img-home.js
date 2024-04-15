function ArticleH2ImgHome({
  articleClassName,
  divClassName,
  h2ClassName,
  h2Text,
  pText,
  imgClassName,
  imgSrc,
  imgAlt,
}) {
  return (
    <article className={articleClassName}>
      <div className={divClassName}>
        <h2 className={h2ClassName}>{h2Text}</h2>
        <p>{pText}</p>
      </div>
      <img className={imgClassName} src={imgSrc} alt={imgAlt} />
    </article>
  );
}
export default ArticleH2ImgHome;
