package br.com.kgsm.exception.exceptions;

public class BlankDescriptionException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public BlankDescriptionException(){
        super("Description is empty or null");
    }

}