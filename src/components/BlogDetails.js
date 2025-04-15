import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogDetails = () => {
    const { id } = useParams(); // Blog ID from URL params
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const apiUrl = 'https://api.admin.pixeladvant.com/api/blog_comments/';
    const blogDetailsUrl = `https://api.admin.pixeladvant.com/api/blog_details/${id}/`;

    const fetchBlogDetails = async () => {
        try {
            const response = await axios.get(blogDetailsUrl);
            setBlog(response.data);
        } catch (err) {
            console.error('Blog fetch error:', err);
            setError('Failed to load blog details. Please try again later.');
        }
    };

    // const fetchComments = async () => {
    //     try {
    //         const response = await axios.get(`${apiUrl}?blog_id=${id}`);
    //         setComments(response.data);
    //     } catch (err) {
    //         console.error('Comments fetch error:', err);
    //         setError('Failed to load comments. Please try again later.');
    //     }
    // };
    const fetchComments = async () => {
        try {
            const response = await axios.get(apiUrl);
            const allComments = response.data;
            const filteredComments = allComments.filter(comment => comment.blog_id == id); // Filter based on blog ID
            setComments(filteredComments);
        } catch (err) {
            console.error('Comments fetch error:', err);
            setError('Failed to load comments. Please try again later.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !comment) {
            setError('All fields are required');
            toast.error('Please fill all the fields'); // Show error toast
            return;
        }

        setIsSubmitting(true);
        setError('');

        const params = {
            blog_id: id,
            name: name,
            email_id: email,
            comment: comment,
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Comment submitted successfully!'); // Show success toast
                setName('');
                setEmail('');
                setComment('');
                fetchComments(); // Refresh the comments list
            } else {
                toast.error(result.message || 'Failed to submit comment'); // Show error toast
            }
        } catch (err) {
            toast.error('An error occurred. Please try again later.'); // Show error toast
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchBlogDetails();
        fetchComments(); // Fetch comments when the component mounts
    }, [id]);

    if (!blog && !error) return <div className="container text-center py-5">Loading blog...</div>;
    if (error) return <div className="container text-center py-5 text-danger">{error}</div>;

    return (
        <div>


            <Link to="/" className="d-flex align-items-center text-decoration-non mb-3" style={{ color: '#182988' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M10.5999 12.7098C10.5061 12.6169 10.4317 12.5063 10.381 12.3844C10.3302 12.2625 10.3041 12.1318 10.3041 11.9998C10.3041 11.8678 10.3302 11.7371 10.381 11.6152C10.4317 11.4934 10.5061 11.3828 10.5999 11.2898L15.1899 6.70982C15.2836 6.61685 15.358 6.50625 15.4088 6.38439C15.4595 6.26253 15.4857 6.13183 15.4857 5.99982C15.4857 5.8678 15.4595 5.7371 15.4088 5.61524C15.358 5.49338 15.2836 5.38278 15.1899 5.28982C15.0025 5.10356 14.749 4.99902 14.4849 4.99902C14.2207 4.99902 13.9672 5.10356 13.7799 5.28982L9.18986 9.87982C8.62806 10.4423 8.3125 11.2048 8.3125 11.9998C8.3125 12.7948 8.62806 13.5573 9.18986 14.1198L13.7799 18.7098C13.9661 18.8946 14.2175 18.9987 14.4799 18.9998C14.6115 19.0006 14.7419 18.9754 14.8638 18.9256C14.9856 18.8758 15.0964 18.8025 15.1899 18.7098C15.2836 18.6169 15.358 18.5063 15.4088 18.3844C15.4595 18.2625 15.4857 18.1318 15.4857 17.9998C15.4857 17.8678 15.4595 17.7371 15.4088 17.6152C15.358 17.4934 15.2836 17.3828 15.1899 17.2898L10.5999 12.7098Z" fill="#182988" />
                </svg>
                <span className="ms-2">Back</span>
            </Link>

            <div className="bg-white rounded">
                {blog && (
                    <Helmet>
                        <title>{blog.seo_title || blog.heading}</title>
                        <meta name="description" content={blog.meta_description || blog.sub_heading} />
                    </Helmet>
                )}


                <div className="container py-5">
                    <div className="row">

                        {/* Main blog content */}
                        <div className="col-lg-8">
                            <img
                                src={blog.feature_image}
                                alt={blog.image_alt_text}
                                className="img-fluid rounded mb-4"
                                style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
                            />
                            <h3 className="fw-bold">{blog.heading}</h3>
                            <p className="text-muted fw-bold">{blog.sub_heading}</p>

                            {/* Blog HTML Content */}
                            <div
                                className="blog-content mt-0 mb-5"
                                dangerouslySetInnerHTML={{ __html: blog.full_description }}
                            />

                            {/* Comments */}
                            <div className="mb-5">
                                <h5>{comments.length} Comments</h5>
                                {comments.map((comment, index) => (
                                    <div key={index} className="mb-3 p-3 bg-light rounded">
                                        <strong>{comment.name}</strong> <br />
                                        <small className="text-muted">{comment.created_at}</small>
                                        <p className="mt-2">{comment.comment}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Leave a Reply */}
                            <div>
                                <h5>Leave a Reply</h5>
                                <form className="bg-light p-4 rounded" onSubmit={handleSubmit}>
                                    <div className="row ">
                                        <div className="col-md-12 mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            placeholder="Your comment"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                                        {isSubmitting ? 'Submitting...' : 'Submit Comment'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4 mt-5 bg-light rounded p-3 mt-lg-0">
                            <div className="mb-4">
                                <h6 className="fw-bold">Tags</h6>
                                <div className="d-flex flex-wrap gap-2">
                                    {blog.tags?.split(',').map((tag, index) => (
                                        <span key={index} className="py-2 px-4 rounded bg-success text-white">{tag.trim()}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BlogDetails;
