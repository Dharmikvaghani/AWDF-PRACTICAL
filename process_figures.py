import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('processed_figures', exist_ok=True)

# Fonts
font_ui_9 = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 9)
font_ui_10 = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 10)
font_ui_11 = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 11)
font_ui_12 = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 12)
font_ui_12_b = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 12)
font_ui_13_b = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 13)
font_cons_10 = ImageFont.truetype('C:/Windows/Fonts/consola.ttf', 10)
font_cons_11 = ImageFont.truetype('C:/Windows/Fonts/consola.ttf', 11)

def patch_common_browser_header(img, prac_num, prac_title):
    draw = ImageDraw.Draw(img)
    # 1. Top right titlebar user
    draw.rectangle([(710, 10), (815, 27)], fill=(51, 65, 85))
    draw.text((718, 12), 'Dharmik Vaghani', fill=(148, 163, 184), font=font_ui_10)
    # 2. Header subtitle
    draw.rectangle([(15, 71), (500, 90)], fill=(30, 58, 95))
    draw.text((18, 73), f'Dharmik Vaghani (24CS104) | ITUE301: Practical {prac_num}: {prac_title}', fill=(147, 197, 253), font=font_ui_9)

# ----------------- Fig 1 -----------------
img1 = Image.open('extracted_imgs/page_2_img_1.png').copy()
patch_common_browser_header(img1, 1, 'React Components & Props')
d1 = ImageDraw.Draw(img1)
# Card title
d1.rectangle([(55, 163), (250, 181)], fill=(255, 255, 255))
d1.text((58, 165), 'About Dharmik Vaghani', fill=(15, 23, 42), font=font_ui_13_b)
# Card meta
d1.rectangle([(40, 193), (550, 211)], fill=(255, 255, 255))
d1.text((43, 195), 'Student ID: 24CS104 | Department of Computer Science & Engineering, CSPIT', fill=(100, 116, 139), font=font_ui_10)
# Card contact
d1.rectangle([(40, 243), (550, 261)], fill=(255, 255, 255))
d1.text((43, 245), 'Email: 24cs104@charusat.edu.in | GitHub: https://github.com/Dharmikvaghani', fill=(37, 99, 235), font=font_ui_10)
# Footer
d1.rectangle([(20, 456), (480, 474)], fill=(30, 41, 59))
d1.text((22, 458), '© 2026 Dharmik Vaghani. All rights reserved. | ITUE301 Practical 1', fill=(100, 116, 139), font=font_ui_9)
img1.save('processed_figures/figure_1.png')

# ----------------- Fig 2 -----------------
img2 = Image.open('extracted_imgs/page_4_img_1.png').copy()
patch_common_browser_header(img2, 2, 'React State & Routing')
d2 = ImageDraw.Draw(img2)
# Name input
d2.rectangle([(48, 250), (370, 276)], fill=(248, 250, 252))
d2.text((58, 257), 'Dharmik Vaghani', fill=(30, 41, 59), font=font_ui_11)
# Email input
d2.rectangle([(414, 250), (760, 276)], fill=(248, 250, 252))
d2.text((424, 257), '24cs104@charusat.edu.in', fill=(30, 41, 59), font=font_ui_11)
img2.save('processed_figures/figure_2.png')

# ----------------- Fig 3 -----------------
img3 = Image.open('extracted_imgs/page_6_img_1.png').copy()
patch_common_browser_header(img3, 3, 'API Integration & Data Rendering')
d3 = ImageDraw.Draw(img3)
# 24CS104_AWDF_Practical-1, 2, 3
d3.rectangle([(38, 214), (260, 230)], fill=(255, 255, 255))
d3.text((41, 215), '24CS104_AWDF_Practical-1', fill=(37, 99, 235), font=font_ui_12_b)
d3.rectangle([(38, 292), (260, 308)], fill=(255, 255, 255))
d3.text((41, 293), '24CS104_AWDF_Practical-2', fill=(37, 99, 235), font=font_ui_12_b)
d3.rectangle([(38, 370), (260, 386)], fill=(255, 255, 255))
d3.text((41, 371), '24CS104_AWDF_Practical-3', fill=(37, 99, 235), font=font_ui_12_b)
img3.save('processed_figures/figure_3.png')

# ----------------- Fig 4 -----------------
img4 = Image.open('extracted_imgs/page_8_img_1.png').copy()
d4 = ImageDraw.Draw(img4)
d4.rectangle([(15, 48), (520, 65)], fill=(15, 23, 42))
d4.text((18, 50), r'PS C:\AWDF Practicals\24CS104_AWDF_Practical-4> npm run dev', fill=(203, 213, 225), font=font_cons_11)
d4.rectangle([(15, 68), (450, 84)], fill=(15, 23, 42))
d4.text((18, 70), '> 24cs104-awdf-practical-4@1.0.0 dev', fill=(148, 163, 184), font=font_cons_11)
img4.save('processed_figures/figure_4.png')

# ----------------- Fig 5 -----------------
img5 = Image.open('extracted_imgs/page_10_img_1.png').copy()
d5 = ImageDraw.Draw(img5)
d5.rectangle([(15, 48), (520, 65)], fill=(15, 23, 42))
d5.text((18, 50), r'PS C:\AWDF Practicals\24CS104_AWDF_Practical-5> npm start', fill=(203, 213, 225), font=font_cons_11)
img5.save('processed_figures/figure_5.png')

# ----------------- Fig 6 -----------------
img6 = Image.open('extracted_imgs/page_12_img_1.png').copy()
patch_common_browser_header(img6, 6, 'Full Stack Integration')
img6.save('processed_figures/figure_6.png')

# ----------------- Fig 7 -----------------
img7 = Image.open('extracted_imgs/page_14_img_1.png').copy()
patch_common_browser_header(img7, 7, 'JWT Authentication & Middleware')
d7 = ImageDraw.Draw(img7)
d7.rectangle([(50, 118), (300, 133)], fill=(240, 253, 244))
d7.text((53, 119), 'Signed in as: 24cs104@charusat.edu.in', fill=(22, 101, 52), font=font_ui_11)
d7.rectangle([(55, 300), (600, 314)], fill=(248, 250, 252))
d7.text((60, 301), "User Payload Decoded: { id: '6a87...', email: '24cs104@charusat.edu.in' }", fill=(22, 101, 52), font=font_cons_10)
img7.save('processed_figures/figure_7.png')

# ----------------- Fig 8 -----------------
img8 = Image.open('extracted_imgs/page_16_img_1.png').copy()
d8 = ImageDraw.Draw(img8)
d8.rectangle([(15, 48), (550, 65)], fill=(15, 23, 42))
d8.text((18, 50), r'PS C:\AWDF Practicals\24CS104_AWDF_Practical-8> npm run build:frontend', fill=(203, 213, 225), font=font_cons_11)
img8.save('processed_figures/figure_8.png')

# ----------------- Fig 9 -----------------
img9 = Image.open('extracted_imgs/page_18_img_1.png').copy()
img9.save('processed_figures/figure_9.png')

# ----------------- Fig 10 -----------------
img10 = Image.open('extracted_imgs/page_20_img_1.png').copy()
d10 = ImageDraw.Draw(img10)
d10.rectangle([(15, 48), (550, 65)], fill=(15, 23, 42))
d10.text((18, 50), r'PS C:\AWDF Practicals\24CS104_AWDF_Practical-10> npm test', fill=(203, 213, 225), font=font_cons_11)
d10.rectangle([(30, 228), (500, 243)], fill=(15, 23, 42))
d10.text((32, 230), '-> Owner: events_user_24cs104@charusat.edu.in', fill=(203, 213, 225), font=font_cons_11)
img10.save('processed_figures/figure_10.png')

# ----------------- Fig 11 -----------------
img11 = Image.open('extracted_imgs/page_22_img_1.png').copy()
d11 = ImageDraw.Draw(img11)
d11.rectangle([(15, 48), (550, 65)], fill=(15, 23, 42))
d11.text((18, 50), r'PS C:\AWDF Practicals\24CS104_AWDF_Practical-11> docker compose up -d', fill=(203, 213, 225), font=font_cons_11)
d11.rectangle([(15, 188), (550, 205)], fill=(15, 23, 42))
d11.text((18, 190), r'PS C:\AWDF Practicals\24CS104_AWDF_Practical-11> docker compose ps', fill=(203, 213, 225), font=font_cons_11)
img11.save('processed_figures/figure_11.png')

# ----------------- Fig 12 -----------------
img12 = Image.open('extracted_imgs/page_24_img_1.png').copy()
img12.save('processed_figures/figure_12.png')

# ----------------- Fig 13 -----------------
img13 = Image.open('extracted_imgs/page_26_img_1.png').copy()
patch_common_browser_header(img13, 13, 'AI API Integration')
img13.save('processed_figures/figure_13.png')

print('All 13 figures processed perfectly!')
