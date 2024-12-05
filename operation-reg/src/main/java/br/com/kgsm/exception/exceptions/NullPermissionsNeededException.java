package br.com.kgsm.exception.exceptions;

public class NullPermissionsNeededException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public NullPermissionsNeededException(){
        super("Permissions needed is null");
    }

}