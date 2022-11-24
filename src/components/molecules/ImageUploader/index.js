import { Icon } from 'claim-app/components'
import { useState } from 'react'
import ImageUploading from 'react-images-uploading'
import styles from './ImageUploader.module.css'

const ImageUploader = ({ value, onChange }) =>
{
    const maxNumber = 50
    const [defaultIcon, setDefaultIcon] = useState({
        color: '#999999',
        variant: 'outlined'
    })

    const onImageChange = imageList =>
    {
        onChange(imageList)
    }

    return (
        <ImageUploading
            value={value}
            onChange={onImageChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
        >
            {({ imageList, onImageUpload, onImageRemove, isDragging, dragProps }) => (
                <div className={styles['outer-wrapper']}>
                    <div
                        className={styles[isDragging ? 'image-upload-wrapper-dragged' : 'image-upload-wrapper']}
                        onClick={onImageUpload}
                        onMouseEnter={() => setDefaultIcon({ color: '#8376f3', variant: 'filled' })}
                        onMouseLeave={() => setDefaultIcon({ color: '#999999', variant: 'outlined' })}
                        {...dragProps}
                    >
                        {isDragging && setDefaultIcon({ color: '#8376f3', variant: 'filled' })}
                        {imageList.length < 1 ? (
                            <>
                                <Icon name="add-circle" variant={defaultIcon.variant} size={45} color={defaultIcon.color} />
                                <span>Klik atau Tarik Gambar ke sini</span>
                            </>
                        ) : (imageList.map((image, index) => (
                            <img src={image['data_url']} className={styles['preview-image']} alt="" key={index} />
                        )))}
                    </div>

                    {imageList.map((image, index) => (
                        <div className={styles['button-wrapper']} key={index}>
                            <button type="button" className={styles['button-remove']} onClick={() => onImageRemove(index)}>Hapus</button>
                        </div>
                    ))}
                </div>
            )}
        </ImageUploading>
    )
}

export default ImageUploader