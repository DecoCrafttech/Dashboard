import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css'; // Quill styles
import ReactQuill from 'react-quill';
import { toast, Toaster } from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'; // Crop styles

const BlogPostForm = () => {
    const [category, setCategory] = useState('');
    const [language, setLanguage] = useState('');
    const [heading, setHeading] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categoryRef = useRef(null);
    const languageRef = useRef(null);
    const headingRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        // Initialize Bootstrap popovers
        document.querySelectorAll('[data-bs-toggle="popover"]').forEach((popover) => {
            new window.bootstrap.Popover(popover);
        });
    }, [errors]);

    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleLanguageChange = (e) => setLanguage(e.target.value);
    const handleHeadingChange = (e) => setHeading(e.target.value);
    const handleContentChange = (value) => setContent(value);

    const handleDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && file.type.startsWith('image/')) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            toast.error('Only image files are allowed.');
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/*', // Allow only image formats
    });

    const handleCropChange = (crop) => setCrop(crop);

    const handleCropComplete = async (crop) => {
        if (image && crop.width && crop.height) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = document.createElement('img');
            img.src = imagePreview;
            canvas.width = crop.width;
            canvas.height = crop.height;
            img.onload = () => {
                ctx.drawImage(img, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
                canvas.toBlob((blob) => {
                    setImage(new File([blob], image.name, { type: blob.type }));
                }, image.type);
            };
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setImagePreview(null);
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};

        if (!category) validationErrors.category = 'Category is required';
        if (!language) validationErrors.language = 'Language is required';
        if (!heading) validationErrors.heading = 'Heading is required';
        if (!content) validationErrors.content = 'Content is required';
        if (!image) validationErrors.image = 'Image is required';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        // Show modal
        window.$('#confirmationModal').modal('show');
    };

    const handleModalConfirm = () => {
        setIsSubmitting(true);
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            window.$('#confirmationModal').modal('hide');
            toast.success('Post submitted successfully!');
        }, 1000);
    };

    const modules = {
        toolbar: [
            [{ 'font': [] }],
            [{ 'header': '1' }, { 'header': '2' }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            [{ 'align': [] }],
            ['link'],
            ['clean'] // Remove formatting button
        ]
    };


    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h1>Create a Blog Post</h1>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="row mb-3">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="category" className="form-label">Select Category</label>
                                <select
                                    id="category"
                                    className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                                    value={category}
                                    onChange={handleCategoryChange}
                                    ref={categoryRef}
                                >
                                    <option value="">Select a category</option>
                                    <option value="tech">Tech</option>
                                    <option value="lifestyle">Lifestyle</option>
                                    <option value="education">Education</option>
                                    <option value="health">Health</option>
                                    <option value="travel">Travel</option>
                                    <option value="food">Food</option>
                                </select>
                                {errors.category && (
                                    <div className="invalid-feedback">
                                        {errors.category}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="language" className="form-label">Select Language</label>
                                <select
                                    id="language"
                                    className={`form-select ${errors.language ? 'is-invalid' : ''}`}
                                    value={language}
                                    onChange={handleLanguageChange}
                                    ref={languageRef}
                                >
                                    <option value="">Select a language</option>
                                    <option value="english">English</option>
                                    <option value="spanish">Spanish</option>
                                    <option value="french">French</option>
                                </select>
                                {errors.language && (
                                    <div className="invalid-feedback">
                                        {errors.language}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="heading" className="form-label">Heading</label>
                            <input
                                type="text"
                                id="heading"
                                className={`form-control ${errors.heading ? 'is-invalid' : ''}`}
                                value={heading}
                                onChange={handleHeadingChange}
                                ref={headingRef}
                            />
                            {errors.heading && (
                                <div className="invalid-feedback">
                                    {errors.heading}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Content</label>
                            <ReactQuill
                                value={content}
                                onChange={setContent}
                                modules={modules} // Pass the modules configuration
                                className="quill-editor"
                            />
                            {errors.content && (
                                <div className="invalid-feedback">
                                    {errors.content}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
              <label htmlFor="image" className="form-label">Upload Image</label>
              <div
                {...getRootProps()}
                className={`dropzone ${errors.image ? 'is-invalid' : ''}`}
                ref={imageRef}
              >
                <input {...getInputProps()} />
                {imagePreview ? (
                  <>
                    <ReactCrop
                      src={imagePreview}
                      crop={crop}
                      onChange={handleCropChange}
                      onComplete={handleCropComplete}
                    />
                    <div className="mt-2">
                      <strong>Uploaded:</strong> {image.name}
                      <button type="button" className="btn btn-danger btn-sm ms-2" onClick={handleRemoveImage}>
                        Remove
                      </button>
                    </div>
                  </>
                ) : (
                  <p>Drag and drop an image here, or click to select one</p>
                )}
              </div>
              {errors.image && (
                <div className="invalid-feedback">
                  {errors.image}
                </div>
              )}
            </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Confirmation Modal */}
            <div className="modal fade" id="confirmationModal" tabIndex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="confirmationModalLabel">Confirm Submission</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Do you really want to post this content?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleModalConfirm} disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Notifications */}
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
};

export default BlogPostForm;
