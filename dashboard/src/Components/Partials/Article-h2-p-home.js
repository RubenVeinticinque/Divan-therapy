function ArticleH2PHome({
  articleClassName,
  h2ClassName,
  h2Text,
  pClassName,
  pText,
  pText2,
  pText3,
  br,
  br2,
}) {
  return (
    <article className={articleClassName}>
      <h2 className={h2ClassName}>{h2Text}</h2>
      <p className={pClassName}>
        {pText}
        {br ? (
          <>
            <br />
            <br />
          </>
        ) : (
          ""
        )}
        {pText2}
        {br2 ? (
          <>
            <br />
            <br />
          </>
        ) : (
          ""
        )}
        {pText3}
      </p>
    </article>
  );
}
export default ArticleH2PHome;
