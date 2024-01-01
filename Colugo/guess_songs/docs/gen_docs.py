import os

# specify folder having images
images_dir = os.getcwd() 

# Filter out the README file and sort the rest based on image numbers
extensions = ['.jpg', '.jpeg', '.png', '.gif', '.JPG', '.JPEG', '.PNG', '.GIF']
images = [img for img in os.listdir(images_dir) if img[-4:] in extensions]
images.sort(key=lambda f: int(''.join(filter(str.isdigit, f))))

# with open("open("../docs/README.md", "w") as f:
    # f.write("# GPT-4\n")
    # for image in images:
        # f.write(f'<p align="center"><img src="{image}" width="600"></p>\n')
        
with open("../docs/index.html", "w") as f:
    f.write("<!DOCTYPE html>\n")
    f.write("<html>\n")
    f.write("<body>\n")
    f.write("<div style='text-align: center;'>\n")  # Center the images
    for image in images:
        f.write(f'<img src="{image}" style="width:800px;"><br/>\n')

    f.write("</div>\n")  
    f.write("</body>\n")
    f.write("</html>\n")

print("docs generated")
