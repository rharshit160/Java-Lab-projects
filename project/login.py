from tkinter import *
from PIL import Image, ImageTk
root = Tk()
root.geometry("1980x1080") 
root.title("login")
root.config(bg="white")
main_frame=Frame (root,bg="Lavender" )
main_frame.pack(pady=100)
img =Image.open("./assets/login.png")
img=img.resize((300,300))
photoimg = ImageTk.PhotoImage(image=img)

label = Label(main_frame, image=photoimg,bg="Lavender")
label.pack()
user_frame=Frame(main_frame,bg='Lavender')
user_frame.pack()
user_label=Label(user_frame,text="username",bg="Lavender",font=("Arial", 20, 'bold'))
user_label.pack(side=LEFT)
user_entry = Entry(user_frame, font=("Arial", 20, 'bold'))
user_entry.pack(padx=10)

pass_frame = Frame(main_frame,
                   bg="Lavender")
pass_frame.pack(pady=10)

pass_label = Label(pass_frame, 
                   text="Password",
                   fg='black',
                   bg="Lavender",
                   font=("Arial", 20, 'bold'))
pass_label.pack(side=LEFT)

pass_entry = Entry(pass_frame, font=("Arial", 20, 'bold'))
pass_entry.pack(padx=10)


btn_frame = Frame(main_frame,
                   bg="Lavender")
btn_frame.pack(pady=10)

btn_login = Button(btn_frame,
                   text="Login",
                   fg='white',
                   bg="powderblue",
                   font=("Arial", 20, 'bold'),
                   bd=4,
                   relief='raised',
                   width=10
                   )
btn_login.pack(side= LEFT)

btn_signup = Button(btn_frame,
                   text="Sign Up",
                   fg='white',
                   bg="salmon",
                   font=("Arial", 20, 'bold'),
                   bd=4,
                   relief='raised',
                   width=10
                   )
btn_signup.pack(padx=10)
root.mainloop()
