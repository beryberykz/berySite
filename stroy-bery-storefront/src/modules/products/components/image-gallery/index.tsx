import { Image as MedusaImage } from "@medusajs/medusa"
import { Container } from "@medusajs/ui"
import ProductInfo from "@modules/products/templates/product-info"
import Image from "next/image"

type ImageGalleryProps = {
  images: MedusaImage[]
}

console.log(ProductInfo)
const ImageGallery = ({ images }: ImageGalleryProps) => {
    
  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        {images.map((image, index) => {
          return (
            <Container
              key={image.id}
              className="relative aspect-[25/34] w-full overflow-hidden bg-white"
              id={image.id}
            >
              <Image
                src={image.url}
                priority={index <= 2 ? true : false}
                className="absolute inset-0 rounded-rounded"
                alt={`Product image ${index + 1}`}
                fill
                sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                style={{
                  objectFit: "contain",
                }}
              />
            </Container>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
