package br.com.kgsm.exception.exceptions;

public class NullRequestException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public NullRequestException(){
        super("Request is null");
    }

}
