function ArticleAdmin({ h5Text, pText }) {
  return (
    <article className="all-therapists-article">
      <h5 className="all-therapists-title color-dark-green">{h5Text}</h5>
      <p>{pText}</p>
    </article>
  );
}

export default ArticleAdmin;
