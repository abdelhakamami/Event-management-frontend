function EventCard({title, description, photo} ) {
    return (
        <div>
            <div className="card w-96 max-h-100  bg-primary-content shadow-xl image-full">
                <figure><img src={photo} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p>{description}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-accent-content">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EventCard;