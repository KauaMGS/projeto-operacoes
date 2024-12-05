package br.com.kgsm.exception.exceptions;

public class NullResponseException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public NullResponseException(){
        super("Response is null");
    }

}
