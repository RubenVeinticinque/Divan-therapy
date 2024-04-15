function ArticleH3PHome({
  articleClassName,
  articleRef,
  artticleId,
  h3ClassName,
  h3Text,
  br,
  intoP,
  pClassName,
  pId,
  pText,
  content,
}) {
  return (
    <article className={articleClassName} ref={articleRef} id={artticleId}>
      <h3 className={h3ClassName}>{h3Text}</h3>
      {br ? <br /> : ""}
      {intoP ? (
        <p className={pClassName} id={pId}>
          {pText}
        </p>
      ) : (
        ""
      )}
      {content}
    </article>
  );
}

export default ArticleH3PHome;
