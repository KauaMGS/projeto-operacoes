package br.com.kgsm.exception.exceptions;

public class InexistentOperationException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public InexistentOperationException(){
        super("This operation do not exist");
    }

}