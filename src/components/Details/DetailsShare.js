const DetailsShare = (props) => {

  return (
    <div className="details-share">
      <a className="shareBTN shareFB" href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${props.chosenItem.name}`} target="_blank" rel="noreferrer noopener"> </a>
      <a className="shareBTN shareTwitter" href={`https://twitter.com/share?text=${props.chosenItem.name} url=${window.location.href}&image=${props.chosenItem.coverImageSmall}`} target="_blank" rel="noreferrer noopener"> </a>
    </div>
  );
}

export default DetailsShare;