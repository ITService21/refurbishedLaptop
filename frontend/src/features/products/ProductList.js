import React from 'react';
import LaptopSingle from '../../Components/common/SingleItem';

const AllProducts = () => {
    const laptops = [
        {
          images: ['/image/slide2A.jpg','/image/slide3A.jpg','/image/slide4A.jpg','/image/slide5A.jpg','/image/slide1A.jpg','/image/slide2A.jpg','/image/slide3A.jpg'], // Replace with actual image URL
          title: 'ASUS Vivobook 14, Core i3-1215U 12th Gen, Thin and Light Laptop, 14" (35.56 cm) FHD, 60Hz (8 GB RAM/512GB SSD/Windows11/Office 2021/Fingerprint/42WHr /Silver/1.40 kg), X1404ZA-NK322WS',
          rating: 3.6,
          reviews: 129,
          purchaseInfo: '100+ bought in past month',
          price: 30990,
          mrp: 56990,
          discount: '46%',
          emiInfo: 'Save extra with No Cost EMI',
          deliveryInfo: 'FREE delivery Mon, 19 May or fastest delivery Tomorrow, 18 May',
          serviceInfo: 'Service: Device Setup',
          availability: 'Limited time deal',
          modelNumber: 'X1404ZA-NK322WS',
          specifications: [
            '8 GB RAM',
            '512GB SSD',
            'Windows 11',
            'Office 2021',
            'Fingerprint Reader',
            '42WHr Battery',
            'Silver Color',
            '1.40 kg Weight',
          ],
        },
        {
          images: ['/image/slide2A.jpg','/image/slide3A.jpg','/image/slide4A.jpg','/image/slide5A.jpg','/image/slide1A.jpg','/image/slide2A.jpg','/image/slide3A.jpg'], // Replace with actual image URL
          title: 'ASUS Vivobook 14, Core i3-1215U 12th Gen, Thin and Light Laptop, 14" (35.56 cm) FHD, 60Hz (8 GB RAM/512GB SSD/Windows11/Office 2021/Fingerprint/42WHr /Silver/1.40 kg), X1404ZA-NK322WS',
          rating: 3.6,
          reviews: 129,
          purchaseInfo: '100+ bought in past month',
          price: 30990,
          mrp: 56990,
          discount: '46%',
          emiInfo: 'Save extra with No Cost EMI',
          deliveryInfo: 'FREE delivery Mon, 19 May or fastest delivery Tomorrow, 18 May',
          serviceInfo: 'Service: Device Setup',
          availability: 'Limited time deal',
          modelNumber: 'X1404ZA-NK322WS',
          specifications: [
            '8 GB RAM',
            '512GB SSD',
            'Windows 11',
            'Office 2021',
            'Fingerprint Reader',
            '42WHr Battery',
            'Silver Color',
            '1.40 kg Weight',
          ],
        },
        {
          images: ['/image/slide2A.jpg','/image/slide3A.jpg','/image/slide4A.jpg','/image/slide5A.jpg','/image/slide1A.jpg','/image/slide2A.jpg','/image/slide3A.jpg'], // Replace with actual image URL
          title: 'ASUS Vivobook 14, Core i3-1215U 12th Gen, Thin and Light Laptop, 14" (35.56 cm) FHD, 60Hz (8 GB RAM/512GB SSD/Windows11/Office 2021/Fingerprint/42WHr /Silver/1.40 kg), X1404ZA-NK322WS',
          rating: 3.6,
          reviews: 129,
          purchaseInfo: '100+ bought in past month',
          price: 30990,
          mrp: 56990,
          discount: '46%',
          emiInfo: 'Save extra with No Cost EMI',
          deliveryInfo: 'FREE delivery Mon, 19 May or fastest delivery Tomorrow, 18 May',
          serviceInfo: 'Service: Device Setup',
          availability: 'Limited time deal',
          modelNumber: 'X1404ZA-NK322WS',
          specifications: [
            '8 GB RAM',
            '512GB SSD',
            'Windows 11',
            'Office 2021',
            'Fingerprint Reader',
            '42WHr Battery',
            'Silver Color',
            '1.40 kg Weight',
          ],
        },
        {
          images: ['/image/slide2A.jpg','/image/slide3A.jpg','/image/slide4A.jpg','/image/slide5A.jpg','/image/slide1A.jpg','/image/slide2A.jpg','/image/slide3A.jpg'], // Replace with actual image URL
          title: 'ASUS Vivobook 14, Core i3-1215U 12th Gen, Thin and Light Laptop, 14" (35.56 cm) FHD, 60Hz (8 GB RAM/512GB SSD/Windows11/Office 2021/Fingerprint/42WHr /Silver/1.40 kg), X1404ZA-NK322WS',
          rating: 3.6,
          reviews: 129,
          purchaseInfo: '100+ bought in past month',
          price: 30990,
          mrp: 56990,
          discount: '46%',
          emiInfo: 'Save extra with No Cost EMI',
          deliveryInfo: 'FREE delivery Mon, 19 May or fastest delivery Tomorrow, 18 May',
          serviceInfo: 'Service: Device Setup',
          availability: 'Limited time deal',
          modelNumber: 'X1404ZA-NK322WS',
          specifications: [
            '8 GB RAM',
            '512GB SSD',
            'Windows 11',
            'Office 2021',
            'Fingerprint Reader',
            '42WHr Battery',
            'Silver Color',
            '1.40 kg Weight',
          ],
        },
        {
          images: ['/image/slide2A.jpg','/image/slide3A.jpg','/image/slide4A.jpg','/image/slide5A.jpg','/image/slide1A.jpg','/image/slide2A.jpg','/image/slide3A.jpg'], // Replace with actual image URL
          title: 'ASUS Vivobook 14, Core i3-1215U 12th Gen, Thin and Light Laptop, 14" (35.56 cm) FHD, 60Hz (8 GB RAM/512GB SSD/Windows11/Office 2021/Fingerprint/42WHr /Silver/1.40 kg), X1404ZA-NK322WS',
          rating: 3.6,
          reviews: 129,
          purchaseInfo: '100+ bought in past month',
          price: 30990,
          mrp: 56990,
          discount: '46%',
          emiInfo: 'Save extra with No Cost EMI',
          deliveryInfo: 'FREE delivery Mon, 19 May or fastest delivery Tomorrow, 18 May',
          serviceInfo: 'Service: Device Setup',
          availability: 'Limited time deal',
          modelNumber: 'X1404ZA-NK322WS',
          specifications: [
            '8 GB RAM',
            '512GB SSD',
            'Windows 11',
            'Office 2021',
            'Fingerprint Reader',
            '42WHr Battery',
            'Silver Color',
            '1.40 kg Weight',
          ],
        },
        {
          images: ['/image/slide2A.jpg','/image/slide3A.jpg','/image/slide4A.jpg','/image/slide5A.jpg','/image/slide1A.jpg','/image/slide2A.jpg','/image/slide3A.jpg'], // Replace with actual image URL
          title: 'ASUS Vivobook 14, Core i3-1215U 12th Gen, Thin and Light Laptop, 14" (35.56 cm) FHD, 60Hz (8 GB RAM/512GB SSD/Windows11/Office 2021/Fingerprint/42WHr /Silver/1.40 kg), X1404ZA-NK322WS',
          rating: 3.6,
          reviews: 129,
          purchaseInfo: '100+ bought in past month',
          price: 30990,
          mrp: 56990,
          discount: '46%',
          emiInfo: 'Save extra with No Cost EMI',
          deliveryInfo: 'FREE delivery Mon, 19 May or fastest delivery Tomorrow, 18 May',
          serviceInfo: 'Service: Device Setup',
          availability: 'Limited time deal',
          modelNumber: 'X1404ZA-NK322WS',
          specifications: [
            '8 GB RAM',
            '512GB SSD',
            'Windows 11',
            'Office 2021',
            'Fingerprint Reader',
            '42WHr Battery',
            'Silver Color',
            '1.40 kg Weight',
          ],
        },
        {
          images: ['/image/slide2A.jpg','/image/slide3A.jpg','/image/slide4A.jpg','/image/slide5A.jpg','/image/slide1A.jpg','/image/slide2A.jpg','/image/slide3A.jpg'], // Replace with actual image URL
          title: 'ASUS Vivobook 14, Core i3-1215U 12th Gen, Thin and Light Laptop, 14" (35.56 cm) FHD, 60Hz (8 GB RAM/512GB SSD/Windows11/Office 2021/Fingerprint/42WHr /Silver/1.40 kg), X1404ZA-NK322WS',
          rating: 3.6,
          reviews: 129,
          purchaseInfo: '100+ bought in past month',
          price: 30990,
          mrp: 56990,
          discount: '46%',
          emiInfo: 'Save extra with No Cost EMI',
          deliveryInfo: 'FREE delivery Mon, 19 May or fastest delivery Tomorrow, 18 May',
          serviceInfo: 'Service: Device Setup',
          availability: 'Limited time deal',
          modelNumber: 'X1404ZA-NK322WS',
          specifications: [
            '8 GB RAM',
            '512GB SSD',
            'Windows 11',
            'Office 2021',
            'Fingerprint Reader',
            '42WHr Battery',
            'Silver Color',
            '1.40 kg Weight',
          ],
        },
    ]

  return (
    <div className="">
      {laptops.map((laptop, index) => (
        <LaptopSingle key={index} item={laptop} />
      ))}
    </div>
  );
};

export default AllProducts;
