import { SignUpValidation } from "./validation";


describe('validation tests', () => {
  
    describe('SignUpValidation function', () => {

        it('should validate the invalid email', () => {

            const validation = SignUpValidation("test@gmail");

            expect(Object.keys(validation.errors)).toContain("email")
            
        });


        it('should validate the valid email', () => {
            const validation = SignUpValidation("test@gmail.com");
            expect(Object.keys(validation.errors)).not.toContain("email")
        });


        it('should validate the invalid password', () => {
            const validation = SignUpValidation("","1123");
            expect(Object.keys(validation.errors)).toContain("password")
        });


        it('should validate the valid password', () => {
            const validation = SignUpValidation("","112345");
            expect(Object.keys(validation.errors)).not.toContain("password")
        });
        

        it('should return a object with errors', () => {
            const validation = SignUpValidation("","");
            expect(Object.keys(validation.errors).length).toBe(2)
        });

        it('should fail validation when the email is invalid', () => {
            const validation = SignUpValidation("test@gmail","123456");
            expect(validation.isValid).toBe(false)
        });

        it('should fail validation when the password is invalid', () => {
            const validation = SignUpValidation("test@gmail.com","12345");
            expect(validation.isValid).toBe(false)
        });

        it('should pass validation when the email and password are valid', () => {
            const validation = SignUpValidation("test@gmail.com","123456");
            expect(validation.isValid).toBe(true)
        });
        
    });
    

})
