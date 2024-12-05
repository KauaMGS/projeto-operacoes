package br.com.kgsm.exception.exceptions;

public class NullRestrictAccessException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public NullRestrictAccessException(){
        super("Restrict Access field is null");
    }

}
